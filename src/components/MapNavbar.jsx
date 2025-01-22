import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AutocompleteInput = ({ availableTags }) => {
  // 可選擇的標籤
  // const [availableTags,setAvailableTags]=useState([]);
  // const availableTags = [
  //   "ActionScript",
  //   "AppleScript",
  //   "Asp",
  //   "BASIC",
  //   "C",
  //   "C++",
  //   "Clojure",
  //   "COBOL",
  //   "ColdFusion",
  //   "Erlang",
  //   "Fortran",
  //   "Groovy",
  //   "Haskell",
  //   "Java",
  //   "JavaScript",
  //   "Lisp",
  //   "Perl",
  //   "PHP",
  //   "Python",
  //   "Ruby",
  //   "Scala",
  //   "Scheme",
  // ];

  // 輸入框的值
  const [inputValue, setInputValue] = useState("");
  // 過濾後的結果
  const [filteredTags, setFilteredTags] = useState([]);
  // 是否顯示建議選項
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 當輸入改變時，過濾符合的選項
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      // 過濾符合的選項
      setFilteredTags(
        availableTags.filter((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setFilteredTags([]);
      setShowSuggestions(false);
    }
  };

  // 點擊選項時，填入輸入框並關閉建議選單
  const handleSelect = (tag) => {
    setInputValue(tag);
    setShowSuggestions(false);
  };

  return (
    <form className='flex border rounded-lg relative'>
      <input
        id='tags'
        type='text'
        placeholder='搜尋站點'
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className='p-2 focus:outline-none focus:border-transparent'
      />
      <button
        className='rounded-lg bg-yellow-700 text-yellow-50 p-2 text-sm'
        type='submit'
      >
        搜尋
      </button>
      {showSuggestions && filteredTags.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ccc",
            position: "absolute",
            background: "white",
            width: "100%",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 1000,
            top: "100%", // 讓選單出現在輸入框正下方
            left: 0, // 與輸入框對齊
            scrollbarWidth: "none",
          }}
        >
          {filteredTags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              onClick={() => handleSelect(tag)}
              style={{
                padding: "8px",
                cursor: "pointer",
                background: "#fff",
                borderBottom: "1px solid #ddd",
              }}
              onMouseDown={(e) => e.preventDefault()} // 避免 onBlur 觸發導致選項消失
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

function MapNavbar({ logo, availableTags }) {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center py-5 px-5 xl:container mx-auto'>
      <Link to='/'>
        <img src={logo} alt='紙箱轉運站' height='56' width='235' />
      </Link>
      <AutocompleteInput availableTags={availableTags}></AutocompleteInput>
      <div className='flex justify-between items-center gap-5'>
        <Link to='/map'>紙箱地圖</Link>
        <Link
          to='/signin'
          className='py-2 px-5 bg-yellow-700 text-yellow-50 rounded-full border-yellow-950 border-2 border-solid'
        >
          登入
        </Link>
      </div>
    </div>
  );
}

export default MapNavbar;
