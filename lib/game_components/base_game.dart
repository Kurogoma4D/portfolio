import 'dart:async';
import 'dart:ui';

import 'package:flame/game.dart';
import 'package:flame_bloc/flame_bloc.dart';
import 'package:portfolio/game_components/game_components.dart';
import 'package:portfolio/logic/blocs/blocs.dart';
import 'package:portfolio/logic/constants.dart';
import 'package:portfolio/logic/entities/entities.dart';

class BaseGame extends FlameGame {
  @override
  FutureOr<void> onLoad() async {
    await add(
      FlameMultiBlocProvider(
        providers: [
          FlameBlocProvider<LifesBloc, Map<Coordinate, LifeState>>(
            create: () => LifesBloc(),
          ),
          FlameBlocProvider<GameSizeBloc, Coordinate>(
            create: () => GameSizeBloc(),
          ),
        ],
        children: [
          GameCanvas(),
          TimerComponent(),
        ],
      ),
    );

    return super.onLoad();
  }
}

class GameCanvas extends FlameGame
    with FlameBlocReader<GameSizeBloc, Coordinate> {
  @override
  Future<void> onLoad() async {
    await addAll([
      LifesRoot(),
    ]);
    return super.onLoad();
  }

  @override
  void onGameResize(Vector2 canvasSize) {
    if (isLoaded) {
      bloc.add(OnGameResize(canvasSize));
    }
    super.onGameResize(canvasSize);
  }
}

class LifesRoot extends FlameGame
    with FlameBlocReader<LifesBloc, Map<Coordinate, LifeState>> {
  final Set<Coordinate> _addedCoordinates = {};

  @override
  Color backgroundColor() => deadLifeColor;

  @override
  Future<void> onLoad() async {
    await addAll([
      FlameBlocListener<LifesBloc, Map<Coordinate, LifeState>>(
        onNewState: _onUpdatedLifes,
      ),
      FlameBlocListener<GameSizeBloc, Coordinate>(
        onNewState: _onComputedSize,
        listenWhen: (previous, next) => previous != next,
      ),
    ]);
    return super.onLoad();
  }

  void _onUpdatedLifes(Map<Coordinate, LifeState> lifes) {
    for (final life in lifes.entries) {
      if (_addedCoordinates.contains(life.key)) {
        continue;
      }

      add(Life(state: life.value));
      _addedCoordinates.add(life.key);
    }
  }

  void _onComputedSize(Coordinate size) {
    if (size == const Coordinate.zero()) {
      return;
    }

    bloc.add(UpsertLifes(size: size));
  }
}
