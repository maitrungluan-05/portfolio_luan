import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Default Fallback Settings
import {
  PERSONAL_INFO,
  WHAT_I_DO_ITEMS,
  ABOUT_TEXT,
  ABOUT_FRAGMENTS,
  HOMETOWN_STORY,
  STORY_MARQUEE_ROW_1,
  STORY_MARQUEE_ROW_2,
} from '../../src/data/portfolioData';

// GET /api/settings
export const getAllSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const settings = await (prisma as any).siteSetting.findMany();
    const settingsMap: Record<string, any> = {
      personal_info: PERSONAL_INFO,
      what_i_do: WHAT_I_DO_ITEMS,
      about: { text: ABOUT_TEXT, fragments: ABOUT_FRAGMENTS },
      hometown: HOMETOWN_STORY,
      marquee: { row1: STORY_MARQUEE_ROW_1, row2: STORY_MARQUEE_ROW_2 },
    };

    // Override with database values if present
    for (const item of settings) {
      try {
        settingsMap[item.key] = JSON.parse(item.value);
      } catch {
        settingsMap[item.key] = item.value;
      }
    }

    res.json({ success: true, data: settingsMap });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    res.json({
      success: true,
      data: {
        personal_info: PERSONAL_INFO,
        what_i_do: WHAT_I_DO_ITEMS,
        about: { text: ABOUT_TEXT, fragments: ABOUT_FRAGMENTS },
        hometown: HOMETOWN_STORY,
        marquee: { row1: STORY_MARQUEE_ROW_1, row2: STORY_MARQUEE_ROW_2 },
      },
    });
  }
};

// PUT /api/settings/:key (Admin)
export const updateSetting = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (value === undefined) {
      res.status(400).json({ success: false, message: 'Giá trị cập nhật không được để trống' });
      return;
    }

    const valueString = typeof value === 'string' ? value : JSON.stringify(value);

    const updated = await (prisma as any).siteSetting.upsert({
      where: { key },
      update: { value: valueString },
      create: { key, value: valueString },
    });

    res.json({
      success: true,
      message: `Đã cập nhật cấu hình ${key} thành công`,
      data: {
        key: updated.key,
        value: typeof value === 'string' ? value : JSON.parse(updated.value),
      },
    });
  } catch (error: any) {
    console.error('Error updating setting:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật cài đặt', error: error.message });
  }
};
