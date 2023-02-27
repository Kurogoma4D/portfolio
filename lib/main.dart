import 'dart:math';

import 'package:flame/components.dart';
import 'package:flame/game.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:portfolio/gen/assets.gen.dart';
import 'package:url_launcher/url_launcher_string.dart';

final random = Random();

@immutable
class Coordinates {
  final int x;
  final int y;

  const Coordinates(this.x, this.y);

  factory Coordinates.zero() => const Coordinates(0, 0);
}

const _sizeFactor = 20.0;

final _deadPaint = Paint()..color = Colors.white;
final _alivePaint = Paint()..color = Colors.orange;

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
          GameWidget(
            game: BaseGame(),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Assets.images.avatar.image(width: 120, height: 120),
                ),
                const Gap(32),
                Text(
                  'Kurogoma4D',
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                        fontWeight: FontWeight.bold,
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
      child: InkWell(
        onHover: (value) =>
            value ? _focus.requestFocus() : FocusScope.of(context).unfocus(),
        focusNode: _focus,
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
    );
  }

  @override
  void dispose() {
    _focus.dispose();
    super.dispose();
  }
}

final entities = <Life>[];

class BaseGame extends FlameGame {
  Coordinates currentResolution = Coordinates.zero();

  @override
  void update(double dt) {
    super.update(dt);
  }

  @override
  void onGameResize(Vector2 canvasSize) {
    removeAll(entities);
    entities.clear();

    final resolution = canvasSize / _sizeFactor;
    currentResolution = Coordinates(
      resolution.x.toInt() + 1,
      resolution.y.toInt() + 1,
    );

    for (var y = 0; y < currentResolution.y; y++) {
      for (var x = 0; x < currentResolution.x; x++) {
        final e = Life(offset: Offset(x.toDouble(), y.toDouble()));
        entities.add(e);
      }
    }

    addAll(entities);

    super.onGameResize(canvasSize);
  }
}

class Life extends PositionComponent {
  Life({required this.offset}) {
    position = Vector2(offset.dx, offset.dy) * _sizeFactor;
    size = Vector2(_sizeFactor, _sizeFactor);
    isNextAlive = random.nextBool();
  }

  bool isAlive = false;
  bool isNextAlive = false;
  final Offset offset;

  @override
  void render(Canvas canvas) {
    canvas.drawRect(size.toRect(), isNextAlive ? _alivePaint : _deadPaint);
    isAlive = isNextAlive;
  }
}
