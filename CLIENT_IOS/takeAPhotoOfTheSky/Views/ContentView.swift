import SwiftUI

extension Data {
    mutating func append(_ string: String) {
        if let data = string.data(using: .utf8) {
            append(data)
        }
    }
}

struct ContentView: View {
    @State private var image: UIImage?
    @State private var isImagePickerPresented: Bool = false
    
    
    
    func sendDataToAPI(imageData: Data) {
        guard let url = URL(string: "https://send-a-photo-of-the-sky-saes-5.vercel.app/upload") else {
            print("Invalid URL")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        
        let boundary = "Boundary-\(UUID().uuidString)"
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        var body = Data()
        body.append("--\(boundary)\r\n")
        body.append("Content-Disposition: form-data; name=\"photo\"; filename=\"image.jpg\"\r\n")
        body.append("Content-Type: image/jpeg\r\n\r\n")
        body.append(imageData)
        body.append("\r\n")
        body.append("--\(boundary)--\r\n")
        
        request.httpBody = body
        
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
            Image(uiImage: UIImage(named: "app_logo")!)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 110, height: 110)
                .foregroundColor(.accentColor)
            Spacer()
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
                .font(.custom("Manrope-Medium", size: 12))
                .frame(width: 75, height: 35)
                .buttonStyle(ThreeDButtonStyle(fillColor: Color(red: 233/255, green: 255/255, blue: 235/255)))
                .previewLayout(.sizeThatFits)
                .padding()
            } else {
                Button("Take a Photo") {
                    isImagePickerPresented.toggle()
                }
                .font(.custom("Manrope-Medium", size: 12))
                .frame(width: 75, height: 35)
                .buttonStyle(ThreeDButtonStyle(fillColor: Color(red: 37/255, green: 150/255, blue: 190/255)))
                .previewLayout(.sizeThatFits)
                .padding()
                .sheet(isPresented: $isImagePickerPresented) {
                    ImagePicker(image: $image)
                }
            }
            Spacer()
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
