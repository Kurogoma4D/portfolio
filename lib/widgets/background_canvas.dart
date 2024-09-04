import 'package:flutter/material.dart';

class BackgroundCanvas extends StatelessWidget {
  const BackgroundCanvas({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO(Kurogoma4D): Flameでの描画がバグってよくわからんのでなんか代わりの背景を作る
    return const SizedBox.shrink();
  }
}
