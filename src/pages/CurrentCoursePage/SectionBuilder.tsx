import { FaEdit } from "react-icons/fa";

import { H, HeaderSizeType, IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { ReactElement } from "react";

export class SectionBuilder {
  private title: string = "";
  private headerSize: HeaderSizeType = 2;
  private subtitle: string = "";
  private showEditButton: boolean = false;
  private description: string = "";
  private editAction: () => void = () => {};
  private editComponent: () => ReactElement = () => <></>;

  setTitle(title: string): SectionBuilder {
    this.title = title;
    return this;
  }

  setHeaderSize(headerSize: HeaderSizeType): SectionBuilder {
    this.headerSize = headerSize;
    return this;
  }

  setSubtitle(subtitle: string): SectionBuilder {
    this.subtitle = subtitle;
    return this;
  }

  setEditable(editable: boolean): SectionBuilder {
    this.showEditButton = editable;
    return this;
  }

  withEditAction(editAction: () => void): SectionBuilder {
    this.editAction = editAction;
    return this;
  }

  withEditComponent(editComponent: () => ReactElement): SectionBuilder {
    this.editComponent = editComponent;
    return this;
  }

  withDescription(description: string): SectionBuilder {
    this.description = description;
    return this;
  }

  build(): ReactElement {
    return (
      <>
        {this.editComponent()}
          
        <div className="flex justify-start items-center gap-2">
          <H size={this.headerSize} color={TextColor.DARK_X}>{this.title}</H>
          {this.showEditButton && (
            <UnstyledButton className="hover:bg-indigo-400 cursor-pointer p-3 rounded-full"
              onPress={this.editAction}>
              <IconContainer>
                <FaEdit />
              </IconContainer>
            </UnstyledButton>
          )}
        </div>
        <P color={TextColor.DARK}>{this.subtitle}</P>
        <div>
          <br />
          <P color={TextColor.DARK}>{this.description}</P>
        </div>
      </>
    );
  }
}
