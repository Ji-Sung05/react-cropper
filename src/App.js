import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

//debounce 함수는 지정된 delay 시간 동안 호출을 지연시키고, 그 시간 동안 다시 호출될 경우 이전 호출을 취소하고 새로 타이머를 시작한다.
//이를 통해 크롭 이벤트가 빈번하게 발생하더라도 호출 빈도가 줄어들어 성능 문제가 해결된다.
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
    //cropperRef.current는 Cropper 컴포넌트의 인스턴스를 가리킨다.
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      //이미지 데이터를 베이스 64 인코딩된 문자열 형태로 가져온다.
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
