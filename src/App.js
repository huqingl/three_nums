import "./App.css";
// import axios from "axios";
import { useEffect, useState } from "react";
function Square({ dataHasNum, children }) {
  return (
    <div
      className="square w-6 h-6 flex justify-center items-center"
      data-has-num={dataHasNum}
    >
      {children}
    </div>
  );
}
function PredictSquare({ dataHasNum, children, makeNum }) {
  const setNum = (i) => {
    makeNum(i);
  };
  return (
    <div
      className="square w-6 h-6 flex justify-center items-center cursor-pointer"
      data-has-num={dataHasNum}
      onClick={() => setNum(dataHasNum)}
    >
      {children}
    </div>
  );
}
function Number({ num, bgColor }) {
  return (
    <span
      className="block w-4 h-4 text-center text-white z-10"
      style={{
        borderRadius: "50%",
        fontSize: "16px",
        lineHeight: "1rem",
        backgroundColor: bgColor,
      }}
    >
      {num}
    </span>
  );
}

function Row({ num, bgColor }) {
  return (
    <div className="row mr-2">
      <div className="flex">
        {Array.from(new Array(10), (v, i) => {
          const el = i === num ? <Number num={i} bgColor={bgColor} /> : "";
          return <Square key={i} dataHasNum={i} children={el} />;
        })}
      </div>
    </div>
  );
}
function PredictRow({ num, bgColor, makeNum }) {
  // useEffect(()=>{
  // console.log(one)
  // },[])
  return (
    <div className="row mr-2">
      <div className="flex">
        {Array.from(new Array(10), (v, i) => {
          const el = i === num ? <Number num={num} bgColor={bgColor} /> : "";
          return (
            <PredictSquare
              key={i}
              dataHasNum={i}
              children={el}
              makeNum={makeNum}
            />
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const prev = "248";
  const data = ["093", "341", "812", "457"];
  var one = [],
    two = [],
    three = [],
    sumEnd = [],
    sumDiff = [];
  data.map((item, index) => {
    one.push(parseInt(item.charAt(0)));
    two.push(parseInt(item.charAt(1)));
    three.push(parseInt(item.charAt(2)));
    let sum =
      parseInt(item.charAt(0)) +
      parseInt(item.charAt(1)) +
      parseInt(item.charAt(2));
    let sumE = parseInt(sum % 10);
    sumEnd.push(sumE);
    if (index === 0) {
      var sumD = Math.abs(
        sumE -
          parseInt(
            (parseInt(prev.charAt(0)) +
              parseInt(prev.charAt(1)) +
              parseInt(prev.charAt(2))) %
              10
          )
      );
    } else {
      sumD = Math.abs(sumEnd[index] - sumEnd[index - 1]);
    }
    sumDiff.push(sumD);
  });
  // const one = [0, 3, 8, 4];
  // const two = [9, 4, 1, 5];
  // const three = [3, 1, 2, 7];
  const [oneWidth, setOneWidth] = useState(0);
  const [oneHeight, setOneHeight] = useState(0);

  const Draw = (data, id) => {
    let cnv = document.getElementById(id);
    let cxt = cnv.getContext("2d");
    cxt.beginPath();

    let startNum = data[0];
    let startX = startNum * 24 + 12;
    let startY = 12;
    cxt.moveTo(startX, startY);
    data.map((item, index) => {
      if (index > 0) {
        let x = item * 24 + 12;
        let y = index * 24 + 12;
        cxt.lineTo(x, y);
      }
    });
    cxt.stroke();
  };
  // useEffect(()=>{
  //   axios.get('/api/caipiao/history?appkey=ca9d0813b12f3338&caipiaoid=12&issueno=&start=0&num=30').then(res=>{
  //     console.log(res)
  //   })
  // },[])
  useEffect(() => {
    const oneLenth = one.length;
    const oneWidth = 24 * 10;
    const oneHeight = 24 * oneLenth;
    setOneWidth(oneWidth);
    setOneHeight(oneHeight);
    Draw(one, "canvas");
    Draw(two, "canvas1");
    Draw(three, "canvas2");
    Draw(sumEnd, "canvas3");
    Draw(sumDiff, "canvas4");
  }, [one]);
  const [num, setNum] = useState(null);
  const [onePredictWidth, setOnePredictWidth] = useState(0);
  const [onePredictTop, setOnePredictTop] = useState(0);
  const [onePredictLeft, setOnePredictLeft] = useState(0);
  const makeNum = (predictNum) => {
    //设置点击选择要显示的数字
    setNum(predictNum);
    //设置连接线所在canvas画布的宽度
    let lastNum = one[one.length - 1];
    let width = Math.abs(lastNum - predictNum) * 24;
    setOnePredictWidth(width);
    //设置画布position
    let top = oneHeight - 12;
    setOnePredictTop(top);
    var left;
    if (lastNum < predictNum) {
      left = lastNum * 24 + 12;
    } else {
      left = predictNum * 24 + 12;
    }
    setOnePredictLeft(left);
    //开始画线
    let cnv = document.getElementById("predict-canvas");
    let cxt = cnv.getContext("2d");

    setTimeout(() => {
      cxt.beginPath();
      if (lastNum < predictNum) {
        cxt.moveTo(0, 0);
        cxt.lineTo(width, 24);
      } else {
        cxt.moveTo(width, 0);
        cxt.lineTo(0, 24);
      }
      cxt.stroke();
    }, 500);
  };
  return (
    <div className="">
      <div className="w-fit flex mx-auto mt-8">
        <div className="relative">
          {one.map((item, index) => {
            return <Row num={item} bgColor="#991b1b" key={index} />;
          })}
          <PredictRow num={num} bgColor="#991b1b" makeNum={makeNum} />
          <canvas
            id="predict-canvas"
            width={onePredictWidth}
            height={24}
            color="#111"
            style={{
              position: "absolute",
              top: onePredictTop,
              left: onePredictLeft,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
          <canvas
            id="canvas"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
        <div className="relative">
          {two.map((item, index) => {
            return <Row num={item} bgColor="#0284c7" key={index} />;
          })}
          <canvas
            id="canvas1"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
        <div className="relative">
          {three.map((item, index) => {
            return <Row num={item} bgColor="#166534" key={index} />;
          })}
          <canvas
            id="canvas2"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
        <div className="relative">
          {sumEnd.map((item, index) => {
            return <Row num={item} bgColor="#a16207" key={index} />;
          })}
          <canvas
            id="canvas3"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
        <div className="relative">
          {sumDiff.map((item, index) => {
            return <Row num={item} bgColor="#155e75" key={index} />;
          })}
          <canvas
            id="canvas4"
            width={oneWidth}
            height={oneHeight}
            color="#111"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              // border: "1px dashed #111",
            }}
          ></canvas>
        </div>
      </div>
    </div>
  );
}
export default App;
