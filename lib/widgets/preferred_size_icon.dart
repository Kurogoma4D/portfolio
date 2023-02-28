import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher_string.dart';

class PreferredSizeIcon extends StatefulWidget {
  const PreferredSizeIcon({
    super.key,
    required this.child,
    required this.url,
  });

  final Widget child;
  final String url;

  @override
  State<PreferredSizeIcon> createState() => PreferredSizeIconState();
}

class PreferredSizeIconState extends State<PreferredSizeIcon> {
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
