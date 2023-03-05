import 'dart:math';

import 'package:bloc/bloc.dart';
import 'package:portfolio/logic/entities/entities.dart';

final random = Random();

abstract class LifesEvent {}

class UpsertLifes extends LifesEvent {
  final Coordinate size;

  UpsertLifes({required this.size});
}

class EnsureUpdateGeneration extends LifesEvent {}

class LifesBloc extends Bloc<LifesEvent, Map<Coordinate, LifeState>> {
  LifesBloc() : super({}) {
    on<UpsertLifes>((event, emit) {
      final lifes = {...state};
      for (var y = 0; y < event.size.y; y++) {
        for (var x = 0; x < event.size.x; x++) {
          final alive = random.nextBool();
          final coordinate = Coordinate(x, y);
          lifes.putIfAbsent(
            coordinate,
            () => LifeState(
              offset: coordinate,
              isAlive: alive,
              isNextAlive: alive,
            ),
          );
        }
      }

      emit(lifes);
    });
    on<EnsureUpdateGeneration>((event, emit) {
      final updated = state
          .map(
            (coordinate, state) => MapEntry(
              coordinate,
              state.copyWith(
                isNextAlive: _computeShouldNextAlive(coordinate),
              ),
            ),
          )
          .map(
            (coordinate, state) => MapEntry(
              coordinate,
              state.copyWith(isAlive: state.isNextAlive),
            ),
          );
      emit(updated);
    });
  }

  bool _computeShouldNextAlive(Coordinate target) {
    var alives = 0;
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        if (dx == 0 && dx == 0) {
          continue;
        }
        final otherCoordinate = target + Coordinate(dx, dy);
        final other = _searchLifeFrom(coordinate: otherCoordinate);
        if (other == null) {
          continue;
        }

        if (other.isAlive) {
          alives++;
        }
      }
    }

    if (alives == 3 || alives == 2) {
      return true;
    }

    return false;
  }

  LifeState? _searchLifeFrom({required Coordinate coordinate}) =>
      state[coordinate];
}
