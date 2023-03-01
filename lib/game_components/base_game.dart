import 'dart:async';

import 'package:collection/collection.dart';
import 'package:flame/game.dart';
import 'package:flame_bloc/flame_bloc.dart';
import 'package:portfolio/game_components/game_components.dart';
import 'package:portfolio/logic/blocs/blocs.dart';
import 'package:portfolio/logic/entities/entities.dart';

class BaseGame extends FlameGame {
  @override
  FutureOr<void> onLoad() async {
    await add(
      FlameMultiBlocProvider(
        providers: [
          FlameBlocProvider<LifesBloc, Set<LifeState>>(
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
    with FlameBlocReader<LifesBloc, Set<LifeState>> {
  Coordinate _currentGameSize = const Coordinate.zero();
  List<Life> _lifes = [];

  @override
  Future<void> onLoad() async {
    await addAll([
      FlameBlocListener<LifesBloc, Set<LifeState>>(onNewState: _onUpdatedLifes),
      FlameBlocListener<GameSizeBloc, Coordinate>(onNewState: _onComputedSize),
    ]);
    return super.onLoad();
  }

  void _onUpdatedLifes(Set<LifeState> lifes) {
    final shouldRemoveLifes = _lifes.whereNot((e) => lifes.contains(e.state));

    if (shouldRemoveLifes.isNotEmpty) {
      print('remove: ${shouldRemoveLifes.length}');
      // removeAll(shouldRemoveLifes);
      _lifes = [..._lifes.whereNot((e) => shouldRemoveLifes.contains(e))];
    }

    final currentCoordinates = _lifes.map((e) => e.state.offset);
    final shouldAddLifeCoordinates =
        lifes.whereNot((e) => currentCoordinates.contains(e));
    if (shouldAddLifeCoordinates.isNotEmpty) {
      final addLifes = shouldAddLifeCoordinates.map((e) => Life(state: e));
      _lifes = [..._lifes, ...addLifes];
      print('add: ${addLifes.length}');
      addAll(addLifes);
    }
  }

  void _onComputedSize(Coordinate size) {
    if (_currentGameSize == const Coordinate.zero()) {
      bloc.add(InitializeLifes(size: size));
      _currentGameSize = size;
      return;
    }

    final diff = size - _currentGameSize;
    if (diff == const Coordinate.zero()) {
      return;
    }

    if (diff.positive != const Coordinate.zero()) {
      bloc.add(InflateLifes(size: diff.positive));
    }

    if (diff.negative != const Coordinate.zero()) {
      bloc.add(DeflateLifes(size: diff.negative));
    }

    _currentGameSize = size;
  }
}
