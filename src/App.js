import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
function Square({ dataHasNum, children }) {
  return (
    <div
      className="square w-5 h-5 flex justify-center items-center"
      data-has-num={dataHasNum}
    >
      {children}
    </div>
  );
}
function PredictSquare({ dataHasNum, cols, children, makeNum }) {
  const setNum = (i, col) => {
    makeNum(i, col);
  };
  return (
    <div
      className="square w-5 h-5 flex justify-center items-center cursor-pointer"
      data-has-num={dataHasNum}
      data-has-cols={cols}
      onClick={() => setNum(dataHasNum, cols)}
    >
      {children}
    </div>
  );
}
function Number({ num, bgColor }) {
  return (
    <span
      className="block w-3.5 h-3.5 text-center text-white z-10"
      style={{
        borderRadius: "50%",
        fontSize: "12px",
        lineHeight: "16px",
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
function PredictRow({ num, bgColor, makeNum, cols, currentCol }) {
  // useEffect(()=>{
  // console.log(one)
  // },[])
  return (
    <div className="row mr-2">
      <div className="flex">
        {Array.from(new Array(10), (v, i) => {
          const el =
            i === num && currentCol ? (
              <Number num={num} bgColor={bgColor} />
            ) : (
              ""
            );
          return (
            <PredictSquare
              key={i}
              dataHasNum={i}
              cols={cols}
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
  // const [prev, setPrev] = useState('')
  // const [data, setData] = useState([])
  // const [one, setOne] = useState([]);
  // const [two, setTwo] = useState([]);
  // const [three, setThree] = useState([]);
  // const [sumEnd, setSumEnd] = useState([]);
  // const [sumDiff, setSumDiff] = useState([]);
  const [allData, setAllData] = useState([]);
  var oneRef = useRef();
  var allRef = useRef();
  // var prev = "000";
  const colors = ["#991b1b", "#0284c7", "#166534", "#a16207", "#155e75"];
  useEffect(() => {
    axios.get("https://huqinlong.com/d/houtai/get_history.php").then((res) => {
      let prev = res.data[0];
      let one = [],
        two = [],
        three = [],
        sumEnd = [],
        sumDiff = [];
      let tempData = res.data.slice(1);
      tempData.forEach((item, index) => {
        one.push(parseInt(item.charAt(0)));
        oneRef.current = one;
        two.push(parseInt(item.charAt(1)));
        three.push(parseInt(item.charAt(2)));
        // setOne([...one, parseInt(item.charAt(0))]);
        // setTwo([...two, parseInt(item.charAt(0))]);
        // setThree([...three, parseInt(item.charAt(0))]);
        let sum =
          parseInt(item.charAt(0)) +
          parseInt(item.charAt(1)) +
          parseInt(item.charAt(2));
        let sumE = parseInt(sum % 10);
        sumEnd.push(sumE);
        // setSumEnd([...sumEnd, sumE]);
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
        // setSumDiff([...sumDiff, sumDiff]);
      });
      // all.push(one, two, three, sumEnd, sumDiff);
      // console.log(all);
      allRef.current = [one, two, three, sumEnd, sumDiff];
      // setOne(one);
      // oneRef.current = one;
      // setTwo(two);
      // setThree(three);
      // setSumEnd(sumEnd);
      // setSumDiff(sumDiff);
      // if (!ignore) {
      setAllData([one, two, three, sumEnd, sumDiff]);
      // }
      // console.log(allData);
    });
    // return () => {
    //   ignore = true;
    // }
    // }
  }, []);
  const [oneWidth, setOneWidth] = useState(0);
  const [oneHeight, setOneHeight] = useState(0);

  const Draw = (data, id) => {
    // console.log(data)
    let cnv = document.getElementById("canvas" + id);
    let cxt = cnv.getContext("2d");
    cxt.beginPath();

    let startNum = data[0];
    let startX = startNum * 20 + 10;
    let startY = 10;
    cxt.moveTo(startX, startY);
    data.forEach((item, index) => {
      if (index > 0) {
        let x = item * 20 + 10;
        let y = index * 20 + 10;
        cxt.lineTo(x, y);
      }
    });
    cxt.stroke();
  };
  useEffect(() => {
    setTimeout(() => {
      const onelenth = oneRef.current.length;
      const onewidth = 20 * 10;
      const oneheight = 20 * onelenth;
      setOneWidth(onewidth);
      setOneHeight(oneheight);
      allRef.current.forEach((item, k) => {
        Draw(item, k);
      });
    }, 2000);
  });
  const predictDraw = (predictNum, data, No) => {
    //设置连接线所在canvas画布的宽度
    let lastNum = data[data.length - 1];
    let width = Math.abs(lastNum - predictNum) * 20;
    // let top = oneHeight - 10;
    var left;
    if (lastNum < predictNum) {
      left = lastNum * 20 + 10;
    } else {
      left = predictNum * 20 + 10;
    }
    let a = predictLeft.map((item, k) => {
      if(k === parseInt(No)){
        return left
      }
      return item;
    });
    setPredictLeft(a)
    let b = predictWidth.map((item, k) => {
      if(k === parseInt(No)){
        return width
      }
      return item;
    });
    setPredictWidth(b)
  
    //开始画线
    let cnv = document.getElementById('predict-canvas'+No);
    let cxt = cnv.getContext("2d");
    cxt.clearRect(0, 0, 200, 20);
    setTimeout(() => {
      cxt.beginPath();
      if (lastNum < predictNum) {
        cxt.moveTo(0, 0);
        cxt.lineTo(width, 20);
      } else {
        cxt.moveTo(width, 0);
        cxt.lineTo(0, 20);
      }
      cxt.stroke();
    }, 500);
  };


  const [nums, setNums] = useState(['','','','','']);
  const [col, setCol] = useState([]);

  const [predictWidth, setPredictWidth] = useState(['','','','','']);
  const [predictLeft, setPredictLeft] = useState(['','','','','']);

  const makeNum = (predictNum, c) => {
    let a = nums.map((item, k) => {
      if(k === parseInt(c)){
        return predictNum
      }
      return item;
    });
    setNums(a);
    setCol([...col, c]);
    predictDraw(predictNum,allRef.current[c], c)
  };

  return (
    <div className="h-full w-full bg-zinc-200 overflow-x-scroll">
      <div className="w-fit h-fit  flex mx-auto pt-10 bg-zinc-200">
        {allData.map((i, k) => {
          return (
            <div className="relative" key={k}>
              {i.map((item, index) => {
                return <Row num={item} bgColor={colors[k]} key={index} />;
              })}
              <PredictRow
                num={nums[k]}
                bgColor={colors[k]}
                makeNum={makeNum}
                cols={k}
                currentCol={col.indexOf(k) !== -1}
              />
              <canvas
                // id="predict-canvas"
                id={`predict-canvas${k}`}
                width={predictWidth[k]}
                height={20}
                color="#111"
                style={{
                  position: "absolute",
                  top: i.length * 20 - 10,
                  left: predictLeft[k],
                  zIndex: 2,
                  // border: "1px dashed #111",
                }}
              ></canvas>
              <canvas
                id={`canvas${k}`}
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
          );
        })}
      </div>
      <div className="h-20 bg-zinc-200"></div>
    </div>
  );
}
export default App;
