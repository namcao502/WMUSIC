"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export interface ISearchProps {}

export default function Search(props: ISearchProps) {
    const [count, setCount] = useState(0);
    let count2 = 0;
    return (
        <div>
            <button className="btn" onClick={() => setCount(count + 1)}>
                {" "}
                count use state:
                {count}
            </button>

            <button className="btn" onClick={() => count2 + 1}>
                {" "}
                count :{count2}
            </button>
            <Link href={"/home"}> go to home</Link>
        </div>
    );
}
