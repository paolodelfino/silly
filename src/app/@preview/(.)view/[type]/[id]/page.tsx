import { Drawer } from "vaul";

export default function ({
  params,
}: {
  params: { type: "media" | "tv"; id: number };
}) {
  return (
    <Drawer.Root shouldScaleBackground defaultOpen>
      {/* <Drawer.Trigger></Drawer.Trigger> */}
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto">{JSON.stringify(params)}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
