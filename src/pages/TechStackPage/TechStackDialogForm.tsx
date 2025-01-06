'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { TechStackForm } from './TechStackForm';
import { useState } from 'react';

export function TechStackDialogForm(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = (): void => setIsDialogOpen(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="add tech stack" variant="outline">
          Suggest Technology
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suggest a New Technology</DialogTitle>
          <DialogDescription>
            Please provide the details of the technology you would like to
            suggest for the tech stack.
          </DialogDescription>
        </DialogHeader>
        <TechStackForm onCloseDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
