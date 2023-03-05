import 'package:bloc/bloc.dart';
import 'package:flame/game.dart';
import 'package:portfolio/logic/constants.dart';
import 'package:portfolio/logic/entities/entities.dart';

abstract class GameSizeEvent {}

class OnGameResize extends GameSizeEvent {
  OnGameResize(this.canvasSize);

  Vector2 canvasSize;
}

class GameSizeBloc extends Bloc<GameSizeEvent, Coordinate> {
  GameSizeBloc() : super(const Coordinate.zero()) {
    on<OnGameResize>((event, emit) {
      final resolution = event.canvasSize / lifeSizeFactor;
      final gameSize = Coordinate(
        resolution.x.toInt() + 1,
        resolution.y.toInt() + 1,
      );
      emit(gameSize);
    });
  }
}
