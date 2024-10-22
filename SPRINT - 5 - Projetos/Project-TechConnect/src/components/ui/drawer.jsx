"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props} />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[90vh] max-w-[990px] w-full flex-col mx-auto rounded-t-[10px] bg-customBlack",  // Definindo altura máxima de 90% da altura da tela
        className
      )}
      {...props}>
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const comments = [
  { id: 1, user: "User", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { id: 2, user: "User", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { id: 3, user: "User", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
];

const CommentBox = () => {
  return (
    <div className="p-4 space-y-4 text-white">
      <input
        type="text"
        placeholder="Digite o que achou da publicação..."
        className="w-full p-2 mb-4 border border-gray-500 rounded bg-customBlack focus:outline-none focus:ring-2 focus:ring-white"
      />
      <ul className="space-y-2 overflow-y-scroll max-h-[400px]">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b border-gray-500 pb-2">
            <p className="font-bold">{comment.user}</p>
            <p className="text-sm text-gray-300">{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const DrawerWithComments = () => {
  return (
    <Drawer>
      <DrawerContent>
        <CommentBox />
      </DrawerContent>
    </Drawer>
  );
};

const DrawerHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerWithComments
}
