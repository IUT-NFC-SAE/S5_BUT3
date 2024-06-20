import SwiftUI
import UIKit

extension Data {
    mutating func append(_ string: String) {
        if let data = string.data(using: .utf8) {
            append(data)
        }
    }
}

struct ContentView: View {
    @State private var image: UIImage?
    @State private var imageID = UUID()
    @State private var isImagePickerPresented: Bool = false
    @State private var isResultViewActive: Bool = false
    @State private var prediction: String = ""
    @State private var score: Double = 0.0
    @State private var resetView: Bool = false
    
    func sendDataToAPI(imageData: Data) {
        guard let url = URL(string: "http://192.168.233.17:5000/predict") else {
            print("Invalid URL")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")
        
        // Ajouter les données de l'image au corps de la requête
        request.httpBody = imageData
        
        // Créer une session URLSession
        let session = URLSession.shared
        
        // Créer la tâche de requête
        let task = session.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error occurred: \(error)")
                return
            }
            guard let httpResponse = response as? HTTPURLResponse,
                  httpResponse.statusCode == 200 else {
                print("Invalid response from server")
                return
            }
            
            if let data = data {
                do {
                    if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any],
                       let prediction = json["prediction"] as? String,
                       let score = json["score"] as? Double {
                        DispatchQueue.main.async {
                            self.prediction = prediction
                            self.score = score
                            self.isResultViewActive = true
                        }
                    }
                } catch {
                    print("Failed to parse JSON response")
                }
            }
        }
        // Démarrer la tâche
        task.resume()
    }
    
    var body: some View {
        NavigationView {
            VStack {
                Image(uiImage: UIImage(named: "app_logo")!)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 110, height: 110)
                    .foregroundColor(.accentColor)
                Spacer()
                if let image = image, !resetView {
                    Image(uiImage: image)
                        .resizable()
                        .scaledToFit()
                        .padding()
                        .id(imageID)
                    
                    Button("Send to API") {
                        if let imageData = image.jpegData(compressionQuality: 0.5) {
                            sendDataToAPI(imageData: imageData)
                        }
                    }
                    .font(.custom("Manrope-Medium", size: 12))
                    .frame(width: 150, height: 50)
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .padding()
                    
                    Button("Reset") {
                        resetView = true
                        imageID = UUID()  // Change the imageID to force the view to update
                    }
                    .font(.custom("Manrope-Medium", size: 12))
                    .frame(width: 150, height: 50)
                    .background(Color.gray)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .padding()
                    
                    NavigationLink(destination: ResultView(prediction: prediction, score: score), isActive: $isResultViewActive) {
                        Text("Results")
                    }

                } else {
                    Button("Take a Photo") {
                        isImagePickerPresented.toggle()
                        resetView = false
                    }
                    .font(.custom("Manrope-Medium", size: 12))
                    .frame(width: 150, height: 50)
                    .background(Color.green)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .padding()
                    .sheet(isPresented: $isImagePickerPresented) {
                        ImagePicker(image: $image, isPresented: $isImagePickerPresented)
                    }
                }
                Spacer()
            }
            .navigationTitle("Photo App")
        }
    }
}

struct ResultView: View {
    var prediction: String
    var score: Double
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        VStack {
            Text("Prediction: \(prediction)")
                .font(.largeTitle)
                .padding()
            Text(String(format: "Score: %.2f", score))
                .font(.title)
                .padding()
            
            Circle()
                .trim(from: 0, to: CGFloat(min(score / 100, 1.0)))
                .stroke(Color.blue, lineWidth: 20)
                .frame(width: 200, height: 200)
                .rotationEffect(Angle(degrees: -90))
                .padding()
            
            Spacer()
            
            Button("Back to Home") {
                presentationMode.wrappedValue.dismiss()
            }
            .font(.custom("Manrope-Medium", size: 12))
            .frame(width: 150, height: 50)
            .background(Color.red)
            .foregroundColor(.white)
            .cornerRadius(10)
            .padding()
        }
        .navigationTitle("Result")
    }
}

struct ImagePicker: UIViewControllerRepresentable {
    @Binding var image: UIImage?
    @Binding var isPresented: Bool
    
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
            
            picker.dismiss(animated: true) {
                self.parent.isPresented = false
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
