import 'dart:math';
import 'dart:ui';

import 'package:collection/collection.dart';
import 'package:flame/components.dart';
import 'package:portfolio/game_components/game_components.dart';
import 'package:portfolio/logic/entities/entities.dart';

const lifeSizeFactor = 40.0;

final _deadPaint = Paint()..color = const Color(0xffEEF3E3);
final _alivePaint = Paint()..color = const Color(0xffB8D9CC);

final random = Random();

Life? _searchLifeFrom({required Coordinate coordinate}) =>
    entities.firstWhereOrNull((e) => e.offset == coordinate);

class Life extends PositionComponent {
  Life({required this.offset}) {
    position =
        Vector2(offset.x.toDouble(), offset.y.toDouble()) * lifeSizeFactor;
    size = Vector2(lifeSizeFactor, lifeSizeFactor);
    isNextAlive = random.nextBool();
  }

  bool isAlive = false;
  bool isNextAlive = false;
  final Coordinate offset;

  double _count = 0.0;

  @override
  void render(Canvas canvas) {
    canvas.drawRect(size.toRect(), isNextAlive ? _alivePaint : _deadPaint);
    isAlive = isNextAlive;
  }

  @override
  void update(double dt) {
    _count += dt;
    if (_count > 1) {
      isNextAlive = _shouldNextAlive();
      _count = 0;
    }
    super.update(dt);
  }

  bool _shouldNextAlive() {
    var alives = 0;
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        if (dx == 0 && dx == 0) {
          continue;
        }
        final targetCoordinate = offset + Coordinate(dx, dy);
        final target = _searchLifeFrom(coordinate: targetCoordinate);
        if (target == null) {
          continue;
        }

        if (target.isAlive) {
          alives++;
        }
      }
    }

    if (alives == 3 || alives == 2) {
      return true;
    }

    return false;
  }
}
