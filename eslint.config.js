import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended, // js 기본 권장 사항 설정
  ...pluginVue.configs['flat/essential'], //필수 문법 에러만

  {
    rules: {
      // 단일 단어 컴포넌트 이름 허용 (Badge.vue, Button.vue 등 UI 컴포넌트용)
      'vue/multi-word-component-names': 'off',
      // 'no-console': 'off', // 콘솔 로그 출력을 무시
      // 'error' 대신 'warn'으로 낮추거나, 아예 안 보려면 'off' 처리
      'no-unused-vars': [
        'warn', // 혹은 'off'
        {
          argsIgnorePattern: '^_', // _로 시작하는 매개변수는 무시 (예: _req)
          varsIgnorePattern: '^_', // _로 시작하는 변수는 무시
        },
      ],
    },
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting, // Formatting 관련 규칙을 무시 -> Prettier가 주로 담당
])
