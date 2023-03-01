import 'dart:math';

import 'package:flutter/foundation.dart';

@immutable
class Coordinate {
  final int x;
  final int y;

  const Coordinate(this.x, this.y);

  const Coordinate.zero()
      : x = 0,
        y = 0;

  Coordinate operator +(Coordinate other) =>
      Coordinate(x + other.x, y + other.y);

  Coordinate operator -(Coordinate other) =>
      Coordinate(x - other.x, y - other.y);

  Coordinate get positive => Coordinate(max(x, 0), max(y, 0));

  Coordinate get negative => Coordinate(min(x, 0), min(y, 0));

  @override
  bool operator ==(Object other) {
    return other is Coordinate && other.x == x && other.y == y;
  }

  @override
  int get hashCode => Object.hash(x, y);

  @override
  String toString() => '($x, $y)';
}
