import 'package:flutter/foundation.dart';

@immutable
class Coordinate {
  final int x;
  final int y;

  const Coordinate(this.x, this.y);

  factory Coordinate.zero() => const Coordinate(0, 0);

  operator +(Coordinate other) => Coordinate(x + other.x, y + other.y);

  @override
  bool operator ==(Object other) {
    return other is Coordinate && other.x == x && other.y == y;
  }

  @override
  int get hashCode => Object.hash(x, y);
}
