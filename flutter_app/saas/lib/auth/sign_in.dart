import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart';

import 'constants.dart';

class SignUp extends StatelessWidget {
  const SignUp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    void navigateHome(AuthResponse response) {
      Navigator.of(context).pushReplacementNamed('/home');
    }

    final darkModeThemeData = ThemeData.dark().copyWith(
      colorScheme: const ColorScheme.dark(
        primary: Color.fromARGB(248, 183, 183, 183), // text below main button
      ),
      textSelectionTheme: TextSelectionThemeData(
        cursorColor: Colors.blueGrey[300], // cursor when typing
      ),
      inputDecorationTheme: InputDecorationTheme(
        fillColor: Colors.grey[800], // background of text entry
        filled: true,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide.none,
        ),
        labelStyle: const TextStyle(
            color:
                Color.fromARGB(179, 255, 255, 255)), // text labeling text entry
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor:
              const Color.fromARGB(255, 22, 135, 188), // main button
          foregroundColor:
              const Color.fromARGB(255, 255, 255, 255), // main button text
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
    );

    return Scaffold(
      appBar: appBar('Sign In'),
      body: ListView(
        padding: const EdgeInsets.all(24.0),
        children: [
          SupaEmailAuth(
            redirectTo: kIsWeb ? null : 'io.supabase.flutter://',
            onSignInComplete: navigateHome,
            onSignUpComplete: navigateHome,
            metadataFields: [
              MetaDataField(
                prefixIcon: const Icon(Icons.person),
                label: 'Username',
                key: 'username',
                validator: (val) {
                  if (val == null || val.isEmpty) {
                    return 'Please enter something';
                  }
                  return null;
                },
              ),
              BooleanMetaDataField(
                label: 'Keep me up to date with the latest news and updates.',
                key: 'marketing_consent',
                checkboxPosition: ListTileControlAffinity.leading,
              ),
              BooleanMetaDataField(
                key: 'terms_agreement',
                isRequired: true,
                checkboxPosition: ListTileControlAffinity.leading,
                richLabelSpans: [
                  const TextSpan(text: 'I have read and agree to the '),
                  TextSpan(
                    text: 'Terms and Conditions',
                    style: const TextStyle(
                      color: Colors.blue,
                    ),
                    recognizer: TapGestureRecognizer()
                      ..onTap = () {
                        // Handle tap on Terms and Conditions
                      },
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}