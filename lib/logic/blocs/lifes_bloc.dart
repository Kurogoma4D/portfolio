import 'dart:math';

import 'package:bloc/bloc.dart';
import 'package:collection/collection.dart';
import 'package:portfolio/logic/entities/entities.dart';

final random = Random();

abstract class LifesEvent {}

class InitializeLifes extends LifesEvent {
  final Coordinate size;

  InitializeLifes({required this.size});
}

class InflateLifes extends LifesEvent {
  final Coordinate size;

  InflateLifes({required this.size});
}

class DeflateLifes extends LifesEvent {
  final Coordinate size;

  DeflateLifes({required this.size});
}

class EnsureUpdateGeneration extends LifesEvent {}

class LifesBloc extends Bloc<LifesEvent, Set<LifeState>> {
  LifesBloc() : super({}) {
    on<InitializeLifes>((event, emit) {
      final lifes = <LifeState>{};
      for (var y = 0; y < event.size.y; y++) {
        for (var x = 0; x < event.size.x; x++) {
          final alive = random.nextBool();
          lifes.add(
            LifeState(
              offset: Coordinate(x, y),
              isAlive: alive,
              isNextAlive: alive,
            ),
          );
        }
      }
      _currentSize = event.size;

      emit(lifes);
    });
    on<InflateLifes>((event, emit) {
      final coordinates = [
        for (var x = 0; x < event.size.x; x++)
          for (var y = 0; y < _currentSize.y; y++)
            Coordinate(_currentSize.x + x, y),
        for (var y = 0; y < event.size.y; y++)
          for (var x = 0; x < _currentSize.x; x++)
            Coordinate(x, _currentSize.y + y),
      ];
      final lifes = coordinates.map((e) {
        final alive = random.nextBool();
        return LifeState(offset: e, isAlive: alive, isNextAlive: alive);
      });

      _currentSize += event.size;
      emit({...state, ...lifes});
    });
    on<DeflateLifes>((event, emit) {
      final lifes = [...state];
      final resultSize = _currentSize + event.size;
      final targetCoordinates = [
        for (var x = 0; x > event.size.x; x--)
          for (var y = 0; y < _currentSize.y; y++)
            Coordinate(_currentSize.x + x, y),
        for (var y = 0; y > event.size.y; y--)
          for (var x = 0; x < _currentSize.x; x++)
            Coordinate(x, _currentSize.y + y),
      ];

      final removables = lifes.where((e) => targetCoordinates.contains(e));
      final result = lifes.whereNot((e) => removables.contains(e));

      print('${state.length}  ${result.length}');
      _currentSize = resultSize;
      emit({...result});
    });
    on<EnsureUpdateGeneration>((event, emit) {
      final updated = state
          .map((e) => e.copyWith(
                isNextAlive: _computeShouldNextAlive(e.offset),
              ))
          .map((e) => e.copyWith(isAlive: e.isNextAlive));
      emit(updated.toSet());
    });
  }

  Coordinate _currentSize = const Coordinate.zero();

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
      state.firstWhereOrNull((e) => e.offset == coordinate);
}
