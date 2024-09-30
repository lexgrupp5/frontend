import { FaEdit } from "react-icons/fa";

import { H, HeaderSizeType, IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { ReactElement } from "react";

export class CourseSectionBuilder {
  private title: string = "";
  private headerSize: HeaderSizeType = 1;
  private subtitle?: string;
  private description?: string;
  private showEditButton: boolean = false;
  private editAction: () => void = () => {};
  private EditComponent: ReactElement = <></>;

  setTitle(title: string, headerSize?: HeaderSizeType): CourseSectionBuilder {
    this.title = title;
    if (headerSize != null) { this.headerSize = headerSize; }
    return this;
  }

  withSubtitle(subtitle: string): CourseSectionBuilder {
    this.subtitle = subtitle;
    return this;
  }

  withDescription(description: string): CourseSectionBuilder {
    this.description = description;
    return this;
  }

  withEditAction(editAction: () => void): CourseSectionBuilder {
    this.editAction = editAction;
    this.showEditButton = true;
    return this;
  }

  withEditComponent(EditComponent: ReactElement): CourseSectionBuilder {
    this.EditComponent = EditComponent;
    return this;
  }

  build(): ReactElement {
    return (
      <>
        {this.EditComponent}
        <div className="flex justify-start items-center gap-2 overflow-hidden">
          <H size={this.headerSize} color={TextColor.DARK_X}>{this.title}</H>
          {this.showEditButton && (
            <UnstyledButton 
              className="hover:bg-indigo-400 cursor-pointer
              flex-shrink-0 p-3 rounded-full"
              onPress={this.editAction}>
              <IconContainer className="size-6 mb-[2px]">
                <FaEdit />
              </IconContainer>
            </UnstyledButton>
          )}
        </div>
        {this.subtitle != null && <P color={TextColor.DARK}>
          {this.subtitle}
        </P>}
        {this.description != null && <div className="mt-2">
          <P color={TextColor.DARK}>{this.description}</P>
        </div>}
      </>
    );
  }
}
