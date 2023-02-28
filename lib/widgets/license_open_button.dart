import 'package:flutter/material.dart';

class LicenseOpenButton extends StatelessWidget {
  const LicenseOpenButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.bottomRight,
      child: IconButton(
        onPressed: () => showLicensePage(context: context),
        icon: const Icon(Icons.my_library_books_outlined),
      ),
    );
  }
}
