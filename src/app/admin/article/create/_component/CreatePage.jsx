"use client";
import { useState } from "react";

export default function CreatePage() {
  const [imgSrc, setImgSrc] = useState("/images/default-image.png");
  const handleChange = (e) => {
    const file = e.target.file?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc(e.target?.result);
      }
    };
  };
  return (
    <form>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" />
      <br />
      <label htmlFor="summary">요약</label>
      <input type="text" id="summary" />
      <br />
      <label htmlFor="content">본문</label>
      <input type="text" id="content" />
      <br />
      <label htmlFor="category">카테고리</label>
      <select id="category">
        <option value="ART">ART</option>
        <option value="ENVIRONMENT">ENVIRONMENT</option>
        <option value="ECONOMY">ECONOMY</option>
        <option value="POLITICS">POLITICS</option>
        <option value="TECHNOLOGY">TECHNOLOGY</option>
      </select>
      <br />
      <label htmlFor="continent">대륙</label>
      <select id="continent">
        <option value="SOUTHAMERICA">SOUTHAMERICA</option>
        <option value="NORTHAMERICA">NORTHAMERICA</option>
        <option value="ASIA">ASIA</option>
        <option value="AFRICA">AFRICA</option>
        <option value="OCEANIA">OCEANIA</option>
        <option value="EUROPE">EUROPE</option>
      </select>
      <br />
      <label htmlFor="image">대표이미지</label>
      <input type="file" id="image" accept="image/*" onChange={handleChange} />
    </form>
  );
}
