using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CompStore.Helpers
{
    public class FileManager
    {
        public static string Save(string root, string folder, IFormFile file , string fileName)
        {
            string newFileName = Guid.NewGuid().ToString() + fileName;
            string path = root + folder + newFileName;
            using (FileStream stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return newFileName;
        }
        public static bool Delete(string root, string folder, string fileName)
        {
            if (fileName != "pp.png")
            {
                string path = root + folder + fileName;
                if (File.Exists(path))
                {
                    File.Delete(path);
                    return true;
                }
                return false;
            }
            return true;
        }
        public static void SaveAudio(string root, string folder, object file)
        {
            string filepath = Path.Combine(root, folder, "audio.wav");
            using (StreamWriter writer = new StreamWriter(filepath))
            {
                writer.WriteLine(file);
            }
        }
    }
}

