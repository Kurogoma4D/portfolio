import 'package:flame/game.dart';
import 'package:flutter/material.dart';
import 'package:portfolio/game_components/game_components.dart';

class BackgroundCanvas extends StatelessWidget {
  const BackgroundCanvas({super.key});

  @override
  Widget build(BuildContext context) {
    return GameWidget(game: BaseGame());
  }
}
