import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    // <Form className="d-flex me-auto" onSubmit={submitHandler}>
    //   <InputGroup>
    //     <FormControl
    //       type="text"
    //       name="q"
    //       id="q"
    //       onChange={(e) => setQuery(e.target.value)}
    //       placeholder="search products..."
    //       aria-label="Search Products"
    //       aria-describedby="button-search"
    //     ></FormControl>
    //     <Button variant="outline-primary" type="submit" id="button-search">
    //       <i className="fas fa-search"></i>
    //     </Button>
    //   </InputGroup>
    // </Form>

    <form className="container-fluid d-flex">
      <input
        type="text"
        name="q"
        id="q"
        className="w-100 searchbox"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search products..."
        aria-label="Search Products"
        aria-describedby="button-search"
        autoComplete="off"
      />
      <div>
        <button className="searchIcon" style={{display : "none"}}>
        <FaSearch type="submit"
          id="button-search"
          onClick={submitHandler} />
      
        </button>
         </div>
    </form>
  );
}
