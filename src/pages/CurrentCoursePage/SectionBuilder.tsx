import { FaEdit } from "react-icons/fa";

import { H, HeaderSizeType, IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { ReactElement } from "react";

export class SectionBuilder {
  private title: string = "";
  private headerSize: HeaderSizeType = 1;
  private subtitle?: string;
  private description?: string;
  private showEditButton: boolean = false;
  private editAction: () => void = () => {};
  private editComponent: () => ReactElement = () => <></>;

  setTitle(title: string, headerSize?: HeaderSizeType): SectionBuilder {
    this.title = title;
    if (headerSize != null) { this.headerSize = headerSize; }
    return this;
  }

  withSubtitle(subtitle: string): SectionBuilder {
    this.subtitle = subtitle;
    return this;
  }

  withDescription(description: string): SectionBuilder {
    this.description = description;
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
