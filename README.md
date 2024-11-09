# Code Step Highlighter

코드 설명을 단계별로 하이라이트하며 보여주는 JavaScript 라이브러리

## 설치

```bash
npm install code-step-highlighter
```

## 사용법

HTML에서 직접 사용:

```html
<div class="code-highlighter" data-language="javascript">
  function example() {
    const a = 1; // [1]
    const b = 2; // [2]
    return a + b; // [3]
  }
</div>

<script>
  const highlighter = new CodeHighlighter('.code-highlighter');
  highlighter.init();
</script>
```

모듈로 사용:

```javascript
import CodeHighlighter from 'code-step-highlighter';

const highlighter = new CodeHighlighter('#my-code');
highlighter.init();
```

## 설정 옵션

```javascript
const options = {
  theme: 'dark', // 테마 (dark/light)
  lineNumbers: true, // 라인 번호 표시
  highlightColor: '#ffeb3b', // 하이라이트 색상
  stepDelay: 1000 // 단계별 딜레이 (ms)
};

const highlighter = new CodeHighlighter('.code-highlighter', options);
```

## 스타일 커스터마이징

CSS 변수를 통해 스타일을 커스터마이징할 수 있습니다:

```css
.code-highlighter {
  --highlight-color: #ffeb3b;
  --background-color: #1e1e1e;
  --text-color: #d4d4d4;
}
```
