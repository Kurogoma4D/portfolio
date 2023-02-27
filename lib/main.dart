import 'dart:math';
import 'dart:ui';

import 'package:collection/collection.dart';
import 'package:flame/components.dart';
import 'package:flame/game.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:portfolio/gen/assets.gen.dart';
import 'package:url_launcher/url_launcher_string.dart';

final random = Random();

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

const _sizeFactor = 40.0;

final _deadPaint = Paint()..color = const Color(0xffEEF3E3);
final _alivePaint = Paint()..color = const Color(0xffB8D9CC);

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kurogoma4D',
      theme: ThemeData(useMaterial3: true),
      home: const _Contents(),
    );
  }
}

class _Contents extends StatelessWidget {
  const _Contents();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          GameWidget(game: BaseGame()),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Assets.images.avatar.image(width: 120, height: 120),
                ),
                const Gap(32),
                ClipRRect(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.white24,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      padding: const EdgeInsets.symmetric(
                        vertical: 16,
                        horizontal: 24,
                      ),
                      child: Text(
                        'Kurogoma4D',
                        style:
                            Theme.of(context).textTheme.headlineLarge?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black87,
                                ),
                      ),
                    ),
                  ),
                ),
                const Gap(48),
                Row(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _PreferredSizeIcon(
                      url: 'https://scrapbox.io/kurogoma4d-lab/',
                      child: Assets.icons.scrapbox.svg(height: 32),
                    ),
                    const Gap(16),
                    _PreferredSizeIcon(
                      url: 'https://twitter.com/Krgm4D',
                      child: Assets.icons.twitter.svg(
                        height: 32,
                        colorFilter: const ColorFilter.mode(
                          Color(0xff1D9BF0),
                          BlendMode.srcIn,
                        ),
                      ),
                    ),
                    const Gap(16),
                    _PreferredSizeIcon(
                      url: 'https://github.com/Kurogoma4D',
                      child: Assets.icons.github.svg(
                        height: 32,
                        colorFilter: const ColorFilter.mode(
                          Color(0xff242424),
                          BlendMode.srcIn,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _PreferredSizeIcon extends StatefulWidget {
  const _PreferredSizeIcon({
    required this.child,
    required this.url,
  });

  final Widget child;
  final String url;

  @override
  State<_PreferredSizeIcon> createState() => _PreferredSizeIconState();
}

class _PreferredSizeIconState extends State<_PreferredSizeIcon> {
  final _focus = FocusNode();

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: ClipRRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
          child: Material(
            color: Colors.white30,
            borderRadius: BorderRadius.circular(8),
            child: InkWell(
              onHover: (value) => value
                  ? _focus.requestFocus()
                  : FocusScope.of(context).unfocus(),
              focusNode: _focus,
              splashColor: Colors.transparent,
              onTap: () => launchUrlString(widget.url),
              borderRadius: BorderRadius.circular(8),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: SizedBox(
                  height: 32,
                  width: 32,
                  child: FittedBox(
                    fit: BoxFit.contain,
                    child: widget.child,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _focus.dispose();
    super.dispose();
  }
}

final entities = <Life>[];
Coordinate currentResolution = Coordinate.zero();

Life? _searchLifeFrom({required Coordinate coordinate}) =>
    entities.firstWhereOrNull((e) => e.offset == coordinate);

class BaseGame extends FlameGame {
  @override
  void onGameResize(Vector2 canvasSize) {
    removeAll(entities);
    entities.clear();

    final resolution = canvasSize / _sizeFactor;
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

class Life extends PositionComponent {
  Life({required this.offset}) {
    position = Vector2(offset.x.toDouble(), offset.y.toDouble()) * _sizeFactor;
    size = Vector2(_sizeFactor, _sizeFactor);
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
