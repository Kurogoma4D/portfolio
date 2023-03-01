import 'dart:ui';

import 'package:flutter/material.dart';

class FrostedGlassEffect extends StatelessWidget {
  const FrostedGlassEffect({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
        child: child,
      ),
    );
  }
}
