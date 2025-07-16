import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

/**
 * 图片选择组件
 * 
 * 支持拍照和从图库选择图片
 */
class ImagePickerWidget extends StatelessWidget {
  final int maxImages;
  final List<String> selectedImages;
  final Function(List<String>) onImagesSelected;
  final Function(int) onImageRemoved;

  const ImagePickerWidget({
    super.key,
    required this.maxImages,
    required this.selectedImages,
    required this.onImagesSelected,
    required this.onImageRemoved,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '选择图片 (${selectedImages.length}/$maxImages)',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: 12),
        
        // 图片预览区域
        if (selectedImages.isNotEmpty)
          Container(
            height: 200,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey.shade300),
              borderRadius: BorderRadius.circular(8),
            ),
            child: maxImages == 1
                ? _buildSingleImagePreview(context)
                : _buildMultipleImagePreview(context),
          ),
        
        const SizedBox(height: 12),
        
        // 选择按钮
        if (selectedImages.length < maxImages)
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => _pickImage(context, ImageSource.camera),
                  icon: const Icon(Icons.camera_alt),
                  label: const Text('拍照'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => _pickImage(context, ImageSource.gallery),
                  icon: const Icon(Icons.photo_library),
                  label: const Text('从图库选择'),
                ),
              ),
            ],
          ),
      ],
    );
  }

  /**
   * 构建单图预览
   */
  Widget _buildSingleImagePreview(BuildContext context) {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Image.file(
            File(selectedImages.first),
            width: double.infinity,
            height: double.infinity,
            fit: BoxFit.cover,
          ),
        ),
        Positioned(
          top: 8,
          right: 8,
          child: GestureDetector(
            onTap: () => onImageRemoved(0),
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: const BoxDecoration(
                color: Colors.red,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.close,
                color: Colors.white,
                size: 16,
              ),
            ),
          ),
        ),
      ],
    );
  }

  /**
   * 构建多图预览
   */
  Widget _buildMultipleImagePreview(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.all(8),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: selectedImages.length,
      itemBuilder: (context, index) {
        return Stack(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Image.file(
                File(selectedImages[index]),
                width: double.infinity,
                height: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            Positioned(
              top: 4,
              right: 4,
              child: GestureDetector(
                onTap: () => onImageRemoved(index),
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: Colors.red,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.close,
                    color: Colors.white,
                    size: 12,
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: 4,
              left: 4,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.7),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  index == 0 ? '第0天' : '当前',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 10,
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  /**
   * 选择图片
   */
  Future<void> _pickImage(BuildContext context, ImageSource source) async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? image = await picker.pickImage(
        source: source,
        maxWidth: 1024,
        maxHeight: 1024,
        imageQuality: 80,
      );

      if (image != null) {
        onImagesSelected([image.path]);
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('选择图片失败：$e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
} 