// 'use client'
// import axios from "axios";
// import { useState } from "react";

// export default function Admin() {
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [body, setBody] = useState("");
//   const [sectionCategory, setSectionCategory] = useState("");
//   const [locationCategory, setLocationCategory] = useState("");
//   const [imgSrc, setImgSrc] = useState();
//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };
//   const handleSummaryChange = (e) => {
//     setSummary(e.target.value);
//   };
//   const handleBodyChange = (e) => {
//     setBody(e.target.value);
//   };
//   const handleCategoryChange = (e) => {
//     setSectionCategory(e.target.value);
//   };
//   const handleContinentChange = (e) => {
//     setLocationCategory(e.target.value);
//   };
//   const handleImgChange = async (e) => {
//     const file = e.target.files[0];
//     setImgSrc(file);
//   };
//   const bodyChangeBtn = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/articles/transform`,
//         {
//           body: body,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response);
//       setBody(response.data.data.body);
//     } catch (error) {
//       console.log("본문변환에러", error);
//     }
//   };
//   const handleSumbit = async (e) => {
//     e.preventDefault();
//     console.log(
//       title,
//       summary,
//       body,
//       sectionCategory,
//       locationCategory,
//       imgSrc
//     );
//     const formData = new FormData();
//     formData.append("image", imgSrc);
//     formData.append("title", title);
//     formData.append("summary", summary);
//     formData.append("body", body);
//     formData.append("sectionCategory", sectionCategory);
//     formData.append("locationCategory", locationCategory);

//     for (const keyValue of formData) console.log(keyValue);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response);
//     } catch (error) {
//       console.log("아티클저장에러", error);
//     }
//   };
//   return (
//     <form onSubmit={handleSumbit} method="post" encType="multipart/form-data">
//       <label htmlFor="title">제목 : </label>
//       <textarea
//         type="text"
//         value={title}
//         id="title"
//         onChange={handleTitleChange}
//       />
//       <br />
//       <br />
//       <label htmlFor="summary">요약 : </label>
//       <textarea
//         type="text"
//         value={summary}
//         id="summary"
//         onChange={handleSummaryChange}
//       />
//       <br />
//       <br />
//       <label htmlFor="content">본문 : </label>
//       <textarea
//         type="text"
//         value={body}
//         id="content"
//         onChange={handleBodyChange}
//       />
//       <br />
//       <br />
//       <label htmlFor="sectionCategory">카테고리 : </label>
//       <select
//         id="sectionCategory"
//         value={sectionCategory}
//         onChange={handleCategoryChange}
//       >
//         <option value="ART">ART</option>
//         <option value="ENVIRONMENT">ENVIRONMENT</option>
//         <option value="ECONOMY">ECONOMY</option>
//         <option value="POLITICS">POLITICS</option>
//         <option value="TECHNOLOGY">TECHNOLOGY</option>
//       </select>
//       <br />
//       <br />
//       <label htmlFor="locationCategory">대륙 : </label>
//       <select
//         id="locationCategory"
//         value={locationCategory}
//         onChange={handleContinentChange}
//       >
//         <option value="SOUTHAMERICA">SOUTHAMERICA</option>
//         <option value="NORTHAMERICA">NORTHAMERICA</option>
//         <option value="ASIA">ASIA</option>
//         <option value="AFRICA">AFRICA</option>
//         <option value="OCEANIA">OCEANIA</option>
//         <option value="EUROPE">EUROPE</option>
//       </select>
//       <br />
//       <br />
//       <label htmlFor="image">대표이미지 : </label>
//       <input
//         type="file"
//         id="image"
//         accept="image/*"
//         onChange={handleImgChange}
//       />
//       <br />
//       <br />
//       <button onClick={bodyChangeBtn}>본문변환</button>
//       <button type="submit">아티클 저장</button>
//     </form>
//   );
// }
