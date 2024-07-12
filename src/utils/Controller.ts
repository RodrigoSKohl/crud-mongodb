import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';

export class Controller<T extends Document> {
  constructor(private model: Model<T>) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem: T = new this.model(req.body);
      await newItem.save();
      res.status(201).send(newItem);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.model.find();
      res.status(200).send(items);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.model.findById(req.params.id);
      if (!item) {
        res.status(404).send();
      } else {
        res.status(200).send(item);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedItem) {
        res.status(404).send();
      } else {
        res.status(200).send(updatedItem);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedItem = await this.model.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        res.status(404).send();
      } else {
        res.status(200).send(deletedItem);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
}