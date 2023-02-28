import 'package:flame/game.dart';
import 'package:portfolio/game_components/game_components.dart';
import 'package:portfolio/logic/entities/entities.dart';

final entities = <Life>[];
Coordinate currentResolution = Coordinate.zero();

class BaseGame extends FlameGame {
  @override
  void onGameResize(Vector2 canvasSize) {
    removeAll(entities);
    entities.clear();

    final resolution = canvasSize / lifeSizeFactor;
    currentResolution = Coordinate(
      resolution.x.toInt() + 1,
      resolution.y.toInt() + 1,
    );

    for (var y = 0; y < currentResolution.y; y++) {
      for (var x = 0; x < currentResolution.x; x++) {
        final e = Life(offset: Coordinate(x, y));
        entities.add(e);
      }
    }

    addAll(entities);

    super.onGameResize(canvasSize);
  }
}
