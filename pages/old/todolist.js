import Link from "next/link";

const todolist = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="./aaa">aaa</Link>
        </li>
        <li>
          <Link href="./bbb">bbb</Link>
        </li>
      </ul>
    </div>
  );
};

export default todolist;
