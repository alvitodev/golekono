from django.apps import AppConfig
import os
import joblib
import pickle
import numpy as np
from django.conf import settings

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    ml_models = {}

    def ready(self):
        # Prevent double loading when running in development reload mode
        if os.environ.get('RUN_MAIN') == 'true' or not settings.DEBUG:
            model_dir = os.path.join(settings.BASE_DIR, 'ml_model', 'models')
            
            # Load sentiment classification models
            self.ml_models['tfidf'] = joblib.load(os.path.join(model_dir, 'tfidf_vectorizer.joblib'))
            self.ml_models['le'] = joblib.load(os.path.join(model_dir, 'label_encoder.joblib'))
            self.ml_models['logreg'] = joblib.load(os.path.join(model_dir, 'sentiment_logreg.joblib'))
            
            # Load Keras Neural Network model with fallback to logreg
            try:
                import tensorflow as tf
                self.ml_models['keras_model'] = tf.keras.models.load_model(
                    os.path.join(model_dir, 'sentiment_nn.keras')
                )
                print("[ML AppConfig] Keras Neural Network loaded in memory successfully!")
            except (ImportError, Exception) as e:
                print(f"[ML AppConfig] Warning: Failed to load Keras model ({e}). Fallback to LogReg will be used.")
                self.ml_models['keras_model'] = None
            
            # Load content-based filtering elements
            self.ml_models['cosine_sim'] = np.load(os.path.join(model_dir, 'cosine_similarity_matrix.npy'))
            
            # Load pandas dataset for destinations
            with open(os.path.join(model_dir, 'wisata_indexed.pkl'), 'rb') as f:
                wisata_data = pickle.load(f)
                
            self.ml_models['df_wisata'] = wisata_data['df']
            self.ml_models['name_to_idx'] = wisata_data['name_to_idx']
            self.ml_models['idx_to_name'] = wisata_data['idx_to_name']
            
            print("[ML AppConfig] Pre-trained models and dataset loaded in memory!")
