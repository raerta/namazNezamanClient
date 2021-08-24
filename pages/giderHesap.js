import React, { useEffect, useState } from "react";

const giderHesap = () => {
  const [gelir1, setGelir1] = useState("");
  const [gelir2, setGelir2] = useState("");

  const [toplamGelir, setToplamGelir] = useState(0);
  const [toplamGider, setToplamGider] = useState("");
  
  const [bakiye, setBakiye] = useState("");

  const [gider1, setGider1] = useState("");
  const [gider2, setGider2] = useState("");
  const [gider3, setGider3] = useState("");
  const [gider4, setGider4] = useState("");
  const [gider5, setGider5] = useState("");
  const [gider6, setGider6] = useState("");
  const [gider7, setGider7] = useState("");
  const [gider8, setGider8] = useState("");
  const [gider9, setGider9] = useState("");
  const [gider10, setGider10] = useState("");

  //   var items = [];

  //   const n = 11;

  //   [...Array(n)].map((elementInArray, index) => items.push("gider" + index));

  //   console.log(giderler);

  //   useEffect(() => {
  //     if (items) {
  //       setGiderler(items.slice(1, 11));
  //     }
  //     const toplam = items.slice(1, 11);

  //     const map = toplam.map((item) => {
  //       return <p key={item}>{item}</p>;
  //     });

  //     setToplamGider(map);
  //   }, []);

  //   console.log(toplamGider);

  useEffect(() => {
    const toplam = Number(gelir1) + Number(gelir2);
    setToplamGelir(toplam);
  }, [gelir1, gelir2]);

  useEffect(() => {
    const toplam =
      Number(gider1) +
      Number(gider2) +
      Number(gider3) +
      Number(gider4) +
      Number(gider5) +
      Number(gider6) +
      Number(gider7) +
      Number(gider8) +
      Number(gider9) +
      Number(gider10);
    setToplamGider(toplam);
  }, [
    gider1,
    gider2,
    gider3,
    gider4,
    gider5,
    gider6,
    gider7,
    gider8,
    gider9,
    gider10,
  ]);

  useEffect(() => {
    if (toplamGider) {
      setBakiye(toplamGelir - toplamGider);
    }
  }, [toplamGelir, toplamGider]);

  return (
    <div className="flex justify-center items-center flex-col">
      <form>
        Gelir Gider Hesaplama
        <label className="flex gap-1">
          <input
            className="border-2 border-black"
            placeholder="Ana Gelir"
            type="number"
            value={gelir1}
            onChange={(e) => setGelir1(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Ek Gelir"
            type="number"
            value={gelir2}
            onChange={(e) => setGelir2(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 mt-4">
          <input
            className="border-2 border-black"
            placeholder="Gider 1"
            type="number"
            value={gider1}
            onChange={(e) => setGider1(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 2"
            type="number"
            value={gider2}
            onChange={(e) => setGider2(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 3"
            type="number"
            value={gider3}
            onChange={(e) => setGider3(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 4"
            type="number"
            value={gider4}
            onChange={(e) => setGider4(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 5"
            type="number"
            value={gider5}
            onChange={(e) => setGider5(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 6"
            type="number"
            value={gider6}
            onChange={(e) => setGider6(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 7"
            type="number"
            value={gider7}
            onChange={(e) => setGider7(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 8"
            type="number"
            value={gider8}
            onChange={(e) => setGider8(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 9"
            type="number"
            value={gider9}
            onChange={(e) => setGider9(e.target.value)}
          />
          <input
            className="border-2 border-black"
            placeholder="Gider 10"
            type="number"
            value={gider10}
            onChange={(e) => setGider10(e.target.value)}
          />
        </label>
      </form>

      <div>Toplam Gelir : {toplamGelir && toplamGelir} ₺</div>
      <div>Toplam Gider : {toplamGider && toplamGider} ₺</div>
      <div>Bakiye : {bakiye && bakiye + " " + "₺"} </div>
    </div>
  );
};

export default giderHesap;
