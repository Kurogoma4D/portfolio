import 'package:flutter/material.dart';
import 'package:portfolio/widgets/widgets.dart';

class Base extends StatelessWidget {
  const Base({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Stack(
        children: [
          BackgroundCanvas(),
          LicenseOpenButton(),
          Profile(),
        ],
      ),
    );
  }
}
