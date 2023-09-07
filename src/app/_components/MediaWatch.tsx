"use client";
import SimpleLoading from "@/app/_components/SimpleLoading";
import VideoPlayer from "@/app/_components/VideoPlayer";
import { useMediaWatch } from "@/app/_stores/media-watch";
import { getMoviePlaylist } from "@/server/actions";
import { Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function () {
  const { title, show, setShow } = useMediaWatch();

  const [data, setData] = useState<string | undefined>();

  useEffect(() => {
    if (title) {
      getMoviePlaylist(title).then((data) => setData(data));
    }
  }, [title]);

  return (
    show && (
      <Dialog.Root defaultOpen onOpenChange={(open) => !open && setShow(false)}>
        <Dialog.Content className="!p-0 w-full h-full max-w-full max-h-full !rounded-none">
          {!data && (
            <Flex
              gap={"2"}
              direction={"column"}
              width={"100%"}
              justify={"center"}
              p={"4"}
            >
              <SimpleLoading />
              <Text align={"center"}>
                If it keeps loading for so much, it probably means that we
                couldn't find the movie.
              </Text>
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
            </Flex>
          )}
          {data && (
            <Box width={"100%"} height={"100%"}>
              <VideoPlayer playlist={data} />
            </Box>
          )}
        </Dialog.Content>
      </Dialog.Root>
    )
  );
}
