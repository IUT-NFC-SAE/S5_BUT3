import SwiftUI

struct ContentView: View {
    @State private var image: UIImage?
    @State private var isImagePickerPresented: Bool = false

    func sendDataToAPI(imageData: Data) {
        // Replace "YOUR_API_ENDPOINT" with your actual API URL
        guard let url = URL(string: "YOUR_API_ENDPOINT") else {
            print("Invalid URL")
            return
        }

        let base64Image = imageData.base64EncodedString()

        let json: [String: Any] = ["image": base64Image]
        let jsonData = try? JSONSerialization.data(withJSONObject: json)

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = jsonData
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error sending to API: \(error.localizedDescription)")
                return
            }

            if let data = data {
                print("API Response: \(String(data: data, encoding: .utf8) ?? "")")
            }
        }.resume()
    }

    var body: some View {
        VStack {
            if let image = image {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
                    .padding()

                Button("Send to API") {
                    if let imageData = image.jpegData(compressionQuality: 0.5) {
                        sendDataToAPI(imageData: imageData)
                    }
                }
                .padding()
            } else {
                Button("Take a Photo") {
                    isImagePickerPresented.toggle()
                }
                .padding()
                .sheet(isPresented: $isImagePickerPresented) {
                    ImagePicker(image: $image)
                }
            }
        }
    }
}

struct ImagePicker: UIViewControllerRepresentable {
    @Binding var image: UIImage?

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.delegate = context.coordinator
        picker.sourceType = .camera
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    class Coordinator: NSObject, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
        var parent: ImagePicker

        init(parent: ImagePicker) {
            self.parent = parent
        }

        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let uiImage = info[.originalImage] as? UIImage {
                parent.image = uiImage
            }

            picker.dismiss(animated: true)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
