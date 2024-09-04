import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:portfolio/gen/assets.gen.dart';

import 'preferred_size_icon.dart';

class Profile extends StatelessWidget {
  const Profile({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(16),
            child: Assets.images.avatar.image(width: 240, height: 240),
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
                child: SelectableText(
                  'Kurogoma4D',
                  style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
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
              PreferredSizeIcon(
                url: 'https://scrapbox.io/kurogoma4d-lab/',
                child: Assets.icons.cosense.image(height: 32),
              ),
              const Gap(16),
              PreferredSizeIcon(
                url: 'https://twitter.com/Krgm4D',
                child: Assets.icons.x.svg(
                  height: 32,
                  colorFilter: const ColorFilter.mode(
                    Colors.white,
                    BlendMode.srcIn,
                  ),
                ),
              ),
              const Gap(16),
              PreferredSizeIcon(
                url: 'https://github.com/Kurogoma4D',
                child: Assets.icons.github.svg(
                  height: 32,
                  colorFilter: const ColorFilter.mode(
                    Colors.white,
                    BlendMode.srcIn,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
