import {
  Box,
  createDisclosure,
  useColorModeValue,
  VStack,
} from "@hope-ui/solid";
import { createMemo, Show } from "solid-js";
import { SwitchColorMode } from "./SwitchColorMode";
import { RightIcon } from "./Icon";
import { CgMoreO } from "solid-icons/cg";
import { SwitchLnaguage } from "~/components";
import { TbLanguageHiragana } from "solid-icons/tb";
import { TbCheckbox } from "solid-icons/tb";
import { toggleCheckbox } from "~/store";
import { createAnimation } from "motion-signals";

export const Right = () => {
  const { isOpen, onToggle } = createDisclosure();
  const margin = createMemo(() => (isOpen() ? "$4" : "$5"));
  const { replay } = createAnimation(
    ".left-toolbar-in",
    {
      opacity: [0, 1],
      scale: [0.6, 1],
    },
    {
      duration: 0.2,
    }
  );
  return (
    <Box
      class="left-toolbar-box"
      pos="fixed"
      right={margin()}
      bottom={margin()}
    >
      <Show
        when={isOpen()}
        fallback={
          <RightIcon
            class="toolbar-toggle"
            as={CgMoreO}
            onClick={() => {
              onToggle();
              replay();
            }}
          />
        }
      >
        <VStack
          class="left-toolbar"
          p="$1"
          rounded="$lg"
          bgColor={useColorModeValue("white", "$neutral4")()}
          spacing="$1"
        >
          <VStack spacing="$1" class="left-toolbar-in">
            <RightIcon
              tip="toggle_checkbox"
              as={TbCheckbox}
              onClick={toggleCheckbox}
            />
            <SwitchLnaguage as="span">
              <RightIcon tip="switch_lang" as={TbLanguageHiragana} />
            </SwitchLnaguage>
            <SwitchColorMode />
          </VStack>
          <RightIcon tip="more" as={CgMoreO} onClick={onToggle} />
        </VStack>
      </Show>
    </Box>
  );
};