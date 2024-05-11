import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get All
router.get('/', async (req, res) => {
  console.log('GET');
  try {
    const notes = await prisma.note.findMany();

    if (notes) {
      const goodNotes = notes.filter(
        (note) => note.content.length > 0 && note.title.length > 0
      );
      return res.status(200).json({
        success: true,
        notes: goodNotes,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Notes could not be found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error getting notes',
    });
  }
});

// Add Note
router.post('/', async (req, res) => {
  const { note, userId } = req.body;
  const { title, content } = note;

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      return res.status(404).json({
        success: false,
        message: 'User could not be found',
      });
    }

    const note = await prisma.note.create({
      data: { title, content, userId: dbUser.id },
    });

    if (note) {
      return res.status(201).json({
        success: true,
        message: 'Added your note!',
        note,
      });
    } else {
      return res.json({
        success: false,
        message: 'Could not create note',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating new note',
    });
  }
});

// Update note
router.put('/:id', async (req, res) => {
  const { note, userId } = req.body;
  const { title, content } = note;

  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.json({
      success: false,
      message: 'ID must be a valid number',
    });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!dbUser) {
    return res.status(404).json({
      success: false,
      message: 'User could not be found',
    });
  }

  const existingNote = await prisma.note.findUnique({
    where: { id: id },
  });

  if (!existingNote) {
    return res.status(404).json({
      success: false,
      message: 'Note could not be found',
    });
  }

  if (existingNote.userId !== dbUser.id) {
    return res.status(401).json({
      success: false,
      message: 'You cannot change this note',
    });
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id: id },
      data: { title, content },
    });

    if (updatedNote) {
      return res.status(200).json({
        success: true,
        message: 'Updated your note!',
        note: updatedNote,
      });
    } else {
      return res.json({
        success: false,
        message: 'Not could not be updated',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating note',
    });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  const { user } = req;

  if (!id || isNaN(id)) {
    return res.json({
      success: false,
      message: 'ID must be a valid number',
    });
  }

  try {
    const note = await prisma.note.findUnique({
      where: { id: id },
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note could not be found',
      });
    }

    if (!user || note.userId !== user.id) {
      return res.status(401).json({
        success: false,
        message: 'You cannot delete this note',
      });
    }

    const deletedNote = await prisma.note.delete({
      where: { id: id },
    });

    if (deletedNote) {
      const notes = await prisma.note.findMany();

      if (notes) {
        const goodNotes = notes.filter(
          (note) => note.content.length > 0 && note.title.length > 0
        );
        return res.status(200).json({
          success: true,
          message: 'Deleted your note!',
          notes: goodNotes,
        });
      } else {
        return res.status(404).json({
          success: true,
          message: 'Deleted your note, but notes cannot be found',
          notes: [],
        });
      }
    } else {
      return res.json({
        success: false,
        message: 'Not could not be deleted',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting note',
    });
  }
});

export default router;
