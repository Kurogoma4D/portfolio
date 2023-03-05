import 'package:flutter/material.dart';
import 'package:portfolio/widgets/base.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kurogoma4D',
      theme: ThemeData(useMaterial3: true),
      home: const Base(),
    );
  }
}
