import 'package:flutter/foundation.dart';
import 'package:portfolio/logic/entities/entities.dart';

@immutable
class LifeState {
  final Coordinate offset;
  final bool isAlive;
  final bool isNextAlive;

  const LifeState({
    this.offset = const Coordinate.zero(),
    this.isAlive = false,
    this.isNextAlive = false,
  });

  int get key => offset.hashCode;

  LifeState copyWith({
    Coordinate? offset,
    bool? isAlive,
    bool? isNextAlive,
  }) =>
      LifeState(
        offset: offset ?? this.offset,
        isAlive: isAlive ?? this.isAlive,
        isNextAlive: isNextAlive ?? this.isNextAlive,
      );
}
