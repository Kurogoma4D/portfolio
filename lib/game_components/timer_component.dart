import 'dart:async';

import 'package:flame/components.dart' hide Timer;
import 'package:flame_bloc/flame_bloc.dart';
import 'package:portfolio/logic/blocs/blocs.dart';
import 'package:portfolio/logic/entities/entities.dart';

class TimerComponent extends Component
    with FlameBlocReader<LifesBloc, Set<LifeState>> {
  late Timer _timer;

  @override
  Future<void> onLoad() async {
    _timer = Timer.periodic(
      const Duration(milliseconds: 1000),
      (_) => bloc.add(EnsureUpdateGeneration()),
    );
    return super.onLoad();
  }

  @override
  void onRemove() {
    _timer.cancel();
    super.onRemove();
  }
}
