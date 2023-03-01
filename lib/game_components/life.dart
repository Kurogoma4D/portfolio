import 'dart:async';
import 'dart:math';
import 'dart:ui';

import 'package:collection/collection.dart';
import 'package:flame/components.dart';
import 'package:flame_bloc/flame_bloc.dart';
import 'package:portfolio/logic/blocs/blocs.dart';
import 'package:portfolio/logic/constants.dart';
import 'package:portfolio/logic/entities/entities.dart';

final _deadPaint = Paint()..color = const Color(0xffEEF3E3);
final _alivePaint = Paint()..color = const Color(0xffB8D9CC);

class Life extends PositionComponent {
  Life({required this.state}) {
    position = Vector2(state.offset.x.toDouble(), state.offset.y.toDouble()) *
        lifeSizeFactor;
    size = Vector2(lifeSizeFactor, lifeSizeFactor);
  }

  late LifeState state;

  @override
  FutureOr<void> onLoad() async {
    await add(FlameBlocListener<LifesBloc, Set<LifeState>>(
      onNewState: (newState) {
        final selfState = newState.firstWhereOrNull((e) => e.key == state.key);
        if (selfState != null) {
          state = selfState;
        }
      },
    ));
    return super.onLoad();
  }

  @override
  void render(Canvas canvas) {
    canvas.drawRect(
        size.toRect(), state.isNextAlive ? _alivePaint : _deadPaint);
  }
}
