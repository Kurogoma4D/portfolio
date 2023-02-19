import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:portfolio/gen/assets.gen.dart';
import 'package:url_launcher/url_launcher_string.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kurogoma4D',
      theme: ThemeData.dark(useMaterial3: true),
      home: const _Contents(),
    );
  }
}

class _Contents extends StatelessWidget {
  const _Contents();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Assets.images.avater.image(width: 120, height: 120),
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
                  child: Assets.icons.github.svg(height: 32),
                ),
              ],
            ),
          ],
        ),
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
