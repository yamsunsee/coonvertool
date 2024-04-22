import { ChangeEvent, useMemo, useState } from "react";

const App = () => {
  const [data, setData] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value.toLowerCase());
  };

  const handleClearAll = () => {
    setData("");
  };

  const clearTones = (input: string) => {
    let result = input.replace(/[áàảãạ]/gim, "a");
    result = result.replace(/[ắằẳẵặ]/gim, "ă");
    result = result.replace(/[ấầẩẫậ]/gim, "â");
    result = result.replace(/[íìỉĩị]/gim, "i");
    result = result.replace(/[óòỏõọ]/gim, "o");
    result = result.replace(/[ớờởỡợ]/gim, "ơ");
    result = result.replace(/[ốồổỗộ]/gim, "ô");
    result = result.replace(/[úùủũụ]/gim, "u");
    result = result.replace(/[ứừửữự]/gim, "ư");
    result = result.replace(/[ếềểễệ]/gim, "ê");
    result = result.replace(/[éèẻẽẹ]/gim, "e");

    return result;
  };

  const convertedData = useMemo(() => {
    let result = clearTones(data);
    result = result.replace(/gi/gim, "z");
    result = result.replace(/u([\s|$])/gim, "o$1");
    result = result.replace(/u/gim, "w");
    result = result.replace(/ưa/gim, "uʝ");
    result = result.replace(/i/gim, "y");
    result = result.replace(/ơ/gim, "ʝ");
    result = result.replace(/ô/gim, "oo");
    result = result.replace(/â/gim, "i");
    result = result.replace(/ă/gim, "a");
    result = result.replace(/ê/gim, "e");
    result = result.replace(/ư/gim, "u");
    result = result.replace(/d/gim, "dz");
    result = result.replace(/đ/gim, "d");
    result = result.replace(/ph/gim, "f");
    return result;
  }, [data]);

  return (
    <div className="h-dvh flex flex-col">
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="size-10">
          <img
            className="size-full object-contain"
            src="/logo.svg"
            alt="Logo"
          />
        </div>
        <div className="text-4xl font-bold text-sky-900">
          C<span className="text-sky-500">oo</span>nvert
          <span className="text-sky-500">oo</span>l
        </div>
      </div>
      <div className="grid xl:grid-cols-2">
        <div className="border-r flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <div className="font-bold text-sky-500">INPUT</div>
            <div
              onClick={handleClearAll}
              className="text-xs cursor-pointer hover:text-sky-500 text-slate-500"
            >
              Clear all
            </div>
          </div>
          <div className="h-[calc(100dvh-7.5rem)] p-4 bg-slate-50">
            <textarea
              value={data}
              onChange={handleChange}
              className="bg-white border resize-none size-full p-4 outline-none rounded-lg"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center xl:justify-end px-4 py-2 border-b border-t xl:border-t-0">
            <div className="font-bold text-sky-500">OUTPUT</div>
          </div>
          <div className="h-[calc(100dvh-7.5rem)] p-4 bg-slate-50">
            <div
              dangerouslySetInnerHTML={{
                __html: convertedData.replace(/\n/gim, "<br />"),
              }}
              className="size-full bg-white border rounded-lg overflow-auto p-4 break-words"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
