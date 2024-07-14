![crop](https://github.com/user-attachments/assets/6b0ae098-0a30-4a23-aaef-c56c7a06dc15)

이미지에서 원하는 부분만 크롭하고 싶을 때 react-cropper 라이브러리를 사용하면 간단하게 구현할 수 있다.

react-cropper는 대표적인 JavaScript 크로핑 라이브러리인 cropper.js를 리액트용으로 포장한 버전이다. 이는 다양한 기능과 설정 옵션을 제공한다.

라이브러리 설치
`npm i react-cropper`

![crop해결](https://github.com/user-attachments/assets/536902f8-1e54-4e5e-8c43-ef9098de2298)

코드
```javaScript
import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const App = () => {
  const cropperRef = useRef(null);

  const onCrop = debounce(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      console.log(cropper.getCroppedCanvas().toDataURL());
    }
  }, 200);

  return (
    <Cropper
      src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
    />
  );
};

export default App;
```

### crop 옵션 사용 시 주의점
이미지 빈도: crop 옵션은 사용자가 크롭 영역을 조작할 때마다 매우 빈번하게 발생할 수 있다.
따라서 성능 저하를 방지하기 위한 처리를 해야 한다.

이미지 품질: getCroppedCanvas 메서드를 사용하여 캔버스 데이터를 가져올 때, 해상도와 이미지 품질을 적절히 설정해야 한다.

>debounce 함수는 지정된 delay 시간 동안 호출을 지연시키고, 그 시간 동안 다시 호출될 경우 이전 호출을 취소하고 새로 타이머를 시작한다.
이를 통해 크롭 이벤트가 빈번하게 발생하더라도 호출 빈도가 줄어들어 성능 문제가 해결된다.

[npm-react-cropper](https://www.npmjs.com/package/react-cropper)
